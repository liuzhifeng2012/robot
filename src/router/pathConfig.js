
export default [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/pages/Index'),
        meta: {
            page_type: '1',
            keepAlive: true
        }
    },
    {
        path: '/pages/Detail/:id',
        name: 'Detail',
        component: () => import('@/pages/Detail'),
        meta: {
            page_type: '2',
            keepAlive: false
        }
    },
    {
        path: "/pages/Error404",
        name: "Error404",
        component: () => import('@/pages/Error404'),
    },
    {
        path: "*",
        redirect: "/"
    },

]