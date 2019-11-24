export const nodeTypes = {
    'root': {
        //'valid_children': ['default', 'grade'],
        'icon': 'fa fa-university',
        // 'valid_childrens':['group'],
    },
    'grade': {
        // 'valid_children': ['default', 'eduYear'],
        // 'max_children': 8,
        'icon': 'fa fa-graduation-cap',
    },
    'eduYear': {
        // 'valid_children': ['default', 'book'],
        // 'max_children': 7,
        'icon': 'fa fa-list',
    },
    'book': {
        // 'valid_children': ['default', 'year'],
        // 'max_children': 6,
        'icon': 'fa fa-book',
    },
    'year': {
        // 'valid_children': ['default', 'fm'],
        // 'max_children': 5,
        'icon': 'fa fa-calendar',
    },
    'fm': {
        // 'valid_children': ['default', 'fasl'],
        // //'max_children': 4,
        'icon': 'fa fa-database',
    },
    'fasl': {
        // 'valid_children': ['default', 'unit'],
        // //'max_children': 3,
        'icon': 'fa fa-tags',
    },
    'unit': {
        // 'valid_children': ['default', 'last'],
        //'max_children': 2,
        'icon': 'fa fa-tag',
    },
    'last': {
        // 'valid_children': ['default'],
        //'max_children': 1,
        'icon': 'fa fa-leanpub',
    },
    'next':{
        // 'valid_children': ['default'],
        //'max_children': 1,
        'icon': 'fa fa-linode',
        //'level':9,
        //'type':'next'
    },
    'default': {
        'icon': 'fa fa-bullseye',
    }
};