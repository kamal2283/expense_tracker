"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
const dashboardService_1 = require("../services/dashboardService");
async function getDashboard(_req, res, next) {
    try {
        const summary = await (0, dashboardService_1.getDashboardSummary)();
        res.json(summary);
    }
    catch (error) {
        next(error);
    }
}
