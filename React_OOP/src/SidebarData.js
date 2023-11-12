import React from "react";

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
    },
    {
        title: 'RootOfEquations',
        path: '/components',
        icon: <FaIcons.FaJs/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Bisection',
                path: '/Bisection',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'FalsePosition',
                path: '/FalsePosition',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'OnePointIteration',
                path: '/OnePointIteration',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'NewtonRaphson',
                path: '/NewtonRaphson',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'Secant',
                path: '/Secant',
                icon: <RiIcons.RiCalculatorFill/>
            },            
        ]
    }
    ,
    {
        title: 'LinearAlgebra',
        path: '/components',
        icon: <FaIcons.FaJs/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: "Cramer's Rule",
                path: '/Cramer',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'Guess Elimination',
                path: '/GuessElim',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'Guess-Jordan Elimination',
                path: '/GuessJordan',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'Matrix Inversion',
                path: '/MatrixInversion',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'LU Decomposition',
                path: '/LUDecomposition',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'Cholesky Decomposition',
                path: '/CholeskyDecomposition',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'Jacobi Iteration',
                path: '/Jacobi',
                icon: <RiIcons.RiCalculatorFill/>
            },        
            {
                title: 'Guess-Seidel Iteration',
                path: '/GuessSeidel',
                icon: <RiIcons.RiCalculatorFill/>
            },                 
        ]
    }
    ,
    {
        title: 'Interpolation and Extrapolation',
        path: '/components',
        icon: <FaIcons.FaJs/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Lagrange',
                path: '/Lagrange',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'NewtonDivided',
                path: '/NewtonDivided',
                icon: <RiIcons.RiCalculatorLine/>
            },
            {
                title: 'Sprine',
                path: '/Sprine',
                icon: <RiIcons.RiCalculatorFill/>
            },      
        ]
    }
    ,
    {
        title: 'Regression',
        path: '/components',
        icon: <FaIcons.FaJs/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Regression',
                path: '/Regression',
                icon: <RiIcons.RiCalculatorFill/>
            },
            {
                title: 'Regression Multi',
                path: '/RegressionMulti',
                icon: <RiIcons.RiCalculatorFill/>
            },     
        ]
    }
]