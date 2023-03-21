import { dataDummy } from "@/dataDummy";
import ErrorHandler from "@/src/handlers/error.handler";
import axios from "axios";
import nc from "next-connect";

const handler = nc(ErrorHandler);

handler
  .get(async (req, res) => {
    const data = dataDummy;
    console.log("data", data);
    return res.status(200).json({ message: "OK!", data });
  })
  .post(async (req, res) => {
    return res.status(201).json({ message: "Posted", dataPosted: req.body });
  })
  .delete(async (req, res) => {
    //controller.delete
    return res.status(201).json({message: "Deleted", dataDeleted: req.body});
  });

export default handler;
