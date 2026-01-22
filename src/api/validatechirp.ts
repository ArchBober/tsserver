import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;
  const cenzuredWords: string[] = ["kerfuffle", "sharbert", "fornax"]

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    throw new Error("Chirp is too long")
    return;
  }

  const validBody: string[] = []
  for (let word of params.body.split(" ")) {
    if (cenzuredWords.includes(word.toLocaleLowerCase())) {
        validBody.push("****")
    } else {
        validBody.push(word)
    }
  }

  respondWithJSON(res, 200, {
    cleanedBody: validBody.join(" "),
    });
}