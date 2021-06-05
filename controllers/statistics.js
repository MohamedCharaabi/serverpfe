import express from 'express';
import mongoose from 'mongoose';

import Request from '../models/Request.js'
import Department from '../models/stages/Department.js'
import Direction from '../models/stages/Direction.js'
import Division from '../models/stages/Division.js'
import Service from '../models/stages/Service.js'

// import Partticipant from '../models/participant.js'

const router = express.Router();



export const allStat = async (req, res) => {

    const depCount = await Department.countDocuments();
    const dirCount = await Direction.countDocuments();
    const divCount = await Division.countDocuments();
    const serCount = await Service.countDocuments();

    const topTheme = await Request.aggregate([
        {
            $group: {
                _id: '$themeDem',
                count: { $sum: 1 },

            },

        },
        {
            $sort: { count: -1 },
        },
        { $limit: 5 }
    ]);

    const monthRequest = await Request.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: '$dateDem' },
                },
                nubr: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    const topThemeMonth = await Request.aggregate([
        {

            $group: {
                _id: {
                    month: { $month: '$dateDem' },
                    theme: '$themeDem',


                },
                nubr: { $sum: 1 },

                // Subject: { $push: { $month: '$dateDem' } }

            },

        },


        {
            $group: {
                _id: {
                    topmonth: '$_id.month',
                    theme: '$_id.theme',
                    nused: { $max: '$nubr' },


                },
                // nubr: { $sum: 1 },

            },
        },


        {
            $sort: { 'nubr': 1, }
        },

        // {
        //     $project: {
        //         total: { "$size": '$Subject' }
        //     }
        // }

    ]);

    res.status(200).json({
        topTheme,
        depCount,
        dirCount,
        divCount,
        serCount,
        monthRequest,
        topThemeMonth
    })
}


export default router;