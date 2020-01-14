import {Request, Response} from "express";

/**
 * Register a pass.
 */
export async function postRegisterPass(request: Request, response: Response) {
    response.sendStatus(201);
}