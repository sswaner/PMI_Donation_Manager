import React, { useState, useEffect, useRef } from 'react';
import { RouterProvider } from "react-router-dom";


import { Routes } from "./Config";

import { createHashRouter } from "react-router-dom";


export default function AppRoutes ()
{



    let Router = createHashRouter( Routes );


    return <RouterProvider router={ Router } />;

}

