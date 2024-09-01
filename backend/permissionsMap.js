const permissionTypes = ["view", "create", "edit", "delete"];

function getFullDefaultPermissionsMap() {
    const permissionsMap = {
        backend: {
            userType: "backend",
            pages: {
                tenantEntities: {
                    _navLabel: "Tenant Entities",
                    _permissions: {
                        // User of userType is allowed (this is default).
                        view: true,
                        // Limit access to certain roles (not implemented yet).
                        create: "admin",
                        edit: ["admin", "editor"],
                        delete: "admin",
                    },
                },
                history: {
                    // Without a _permissions field, all is allowed for user of userType.
                    _navLabel: "History",
                },
                profile: {
                    _navLabel: "Profile",
                },
                adminTasks: {
                    _navLabel: "Admin Tasks",
                    _pages: {
                        // Manage users, invite people to join.
                        people: {
                            _navLabel: "People",
                            _permissions: {
                                create: ["admin"],
                                edit: ["admin", "editor"],
                            },
                        },
                        // Define roles in which people can be scheduled.
                        roles: {
                            _navLabel: "Roles",
                        },
                        // Setup locations
                        locations: {
                            _navLabel: "Locations",
                        },
                        // Setup event types
                        eventTypes: {
                            _navLabel: "Event Types",
                        },
                    },
                },
                logout: {
                    _navLabel: "Logout",
                }
            },
        },
        tenant: {
            userType: "tenant",
            pages: {
                // Administrative tasks.
                adminTasks: {
                    _pages: {
                        // Manage users, invite people to join.
                        people: {
                            _navLabel: "People",
                            _permissions: {
                                create: ["admin"],
                                edit: ["admin", "editor"],
                            },
                        },
                        // Define roles in which people can be scheduled.
                        roles: {
                            _navLabel: "Roles",
                        },
                        // Setup locations
                        locations: {
                            _navLabel: "Locations",
                        },
                        // Setup event types
                        eventTypes: {
                            _navLabel: "Event Types",
                        },
                    },
                },
                // Everything events.
                events: {
                    _pages: {
                        // Manage local lyrics and sheet music.
                        // - keep a master song title list (global db, to avoid multiple entries for the same song) with a master arrangement list (arrangements from all tenant entities)
                        // - have an option to share an arrangement with others entities (specific ones or all)
                        musicDatabase: {},
                        // Manage images, videos, audio files
                        // - support categorizing and tagging media
                        // - have option to share media with other entities (specific ones or all)
                        mediaDatabase: {},
                        // Main events page
                        // - view/filter (by location, event type etc), add, remove, edit
                        upcomingEvents: {},
                        // Live controls
                        live: {},
                    },
                },
                profile: {},
                logout: {},
            },
        },
        standalone: {},
    };

    return permissionsMap;
}

function getPermissionsMapForUser(accountType, user) {
    const fullMapCopy = getFullDefaultPermissionsMap();
    if (!user || !accountType || !fullMapCopy[accountType]) {
        return null;
    }

    const mapSlice = fullMapCopy[accountType].pages;    
    addInRouteMapInfo(mapSlice);
    filterMapSliceByUserRoles(mapSlice, user.toObject().roles);
    return mapSlice;
}


// Transform the mapSlice into a flatter and user roles specific map to pass to the frontend.
function filterMapSliceByUserRoles(mapSlice, roles) {
    if (typeof mapSlice !== 'object') {
        return;
    }

    if (typeof roles !== 'object') {
        roles = [];
    }

    const itemsKeys = Object.keys(mapSlice);
    itemsKeys.forEach(itemKey => {
        const item = mapSlice[itemKey];
        const keys = Object.keys(item);

        if (keys.includes("_pages")) {
            // Run this for the subset of pages.
            filterMapSliceByUserRoles(item["_pages"], roles);

            // Now move the items under _pages up one level and get rid of the _pages key.
            const pagesKeys = Object.keys(item["_pages"]);
            pagesKeys.forEach(pageKey => {
                item[pageKey] = item["_pages"][pageKey];
            })
            delete item["_pages"];
        }

        if (!keys.includes("_permissions")) {
            item._permissions = {};
        }

        const definedPermissionKeys = Object.keys(item._permissions);

        // Set _permissions based on roles where they're not already boolean.
        definedPermissionKeys.forEach((permissionKey) => {
            const permissionValueType = typeof item._permissions[permissionKey];
            const permissionValue = item._permissions[permissionKey];
            let resultValue = true;

            switch (permissionValueType) {
                case "object":
                    if (!Array.isArray(permissionValue)) {
                        // Unexpected, only arrays are allowed here.
                        break;
                    }
                    // See if any of the qualifying roles that are specified on the map matches at least one of the user roles.
                    const matchingRoles = permissionValue.filter((qualifyingRole) => roles.includes(qualifyingRole));
                    resultValue = matchingRoles.length > 0;
                    break;

                case "string":
                    // Permission is defined as a role (string).
                    resultValue = roles.includes(permissionValue);
                    break;

                case "boolean":
                    // Permission is defined as boolean, just copy it.
                    resultValue = permissionValue;
                    break;
            }

            item._permissions[permissionKey] = resultValue;
        });

        // Add the default for any missing _permissions.
        permissionTypes.forEach((permissionKey) => {
            if (!definedPermissionKeys.includes(permissionKey)) {
                item._permissions[permissionKey] = true;
            }
        });
    })
}

function addInRouteMapInfo(filteredMapSlice, keyPrefix = null) {
    const itemsKeys = Object.keys(filteredMapSlice);
    itemsKeys.forEach(itemKey => {
        const fullKey = keyPrefix ? `${keyPrefix}.${itemKey}` : itemKey;        

        if (filteredMapSlice[itemKey]._pages) {
            addInRouteMapInfo(filteredMapSlice[itemKey]._pages, itemKey);
        } else {
            filteredMapSlice[itemKey]._routeId = fullKey;
        }
    });
}

export {
    getPermissionsMapForUser,
}