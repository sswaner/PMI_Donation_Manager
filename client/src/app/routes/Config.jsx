import * as React from 'react';
import { Navigate } from 'react-router-dom';



/* Layouts */
import AdminLayout from './Layouts/AdminLayout';//normal
// import CandidateLayout from './Layouts/CandidateLayout';//normal



/* Admin */
import Login from '@module/super_admin/auth/Login'; //normal
const AccountList = React.lazy( () => import( "@module/super_admin/account/AccountList" ) ); //lazy
const AccountAdd = React.lazy( () => import( "@module/super_admin/account/AccountAdd" ) ); //lazy
const AccountEdit = React.lazy( () => import( "@module/super_admin/account/AccountEdit" ) ); //lazy


// const DonationAdd = React.lazy( () => import( "@module/super_admin/donation/DonationAdd" ) ); //lazy
// const DonationEdit = React.lazy( () => import( "@module/super_admin/donation/DonationEdit" ) ); //lazy



// const ContactAdd = React.lazy( () => import( "@module/super_admin/contact/ContactAdd" ) ); //lazy
// const  ContactEdit= React.lazy( () => import( "@module/super_admin/contact/ContactEdit" ) ); //lazy


{/* <ContactAdd></ContactAdd> */ }

export const Routes = [
    {
        path: '/',

        children: [
            { path: "/", element: <Navigate to="/admin/login" /> },
            { path: "/admin", element: < Navigate to="/admin/login" /> },
            {
                path: 'admin',
                children: [
                    { path: "*", element: < Navigate to="/admin/login" /> },
                    { path: 'login', element: <Login /> },
                ]
            },
            {
                element: <AdminLayout />,
                // errorElement: <>error in admin</>,
                path: 'admin',
                children: [
                    { path: 'account', element: <AccountList /> },
                    { path: 'account/add', element: <AccountAdd /> },
                    { path: 'account/edit/:rid', element: <AccountEdit /> },

                    // { path: 'donation/add', element: <DonationAdd /> },
                    // { path: 'donation/edit', element: <DonationEdit /> },

                    // { path: 'contact/add', element: <ContactAdd /> },
                    // { path: 'contact/edit/:rid', element: <ContactEdit /> },


                ]
            }

        ],
    },

];









