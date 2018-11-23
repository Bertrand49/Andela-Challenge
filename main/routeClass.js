import Parcels from "../db/parcels";
import moment from "moment";

class postsController {
  static getParcels(req, res) {
    return res.json({
      message: "List Of Stored Parcels",
      parcels: Parcels
    });
  }// done!!

static createParcel(req, res) {
    const newId = parseInt(Parcels.length) + 1;
    const {destination,weight,price,userid} = req.body;
    const newParcel = {
      id: newId,
      destination:destination,
      weight:weight,
      price:price,
      userid:userid,
      Recorded_Time: moment.utc().format()
    };
    Parcels.push(newParcel);
    return res.status(200).json({
      message: "New Shipment Order Created!"
    });
  }

static getSpecificParcel(req, res) {
    const { id } = req.params;
    const parcel = Parcels.find(oneParcel => oneParcel.id == id);
    if (parcel) {
      return res.status(200).json({
        message: "A Parcel Order Has Been Found:",
        Parcel: parcel
      });
    } else {
      res.status(400).json({
        error: "No Parcel Order with the Specified Id"
      });
    }
  }
  static updateParcel(req, res) {
    const { id } = req.params;
    const parcel = Parcels.find(updateParcel => updateParcel.id == id);
    if (parcel) {
      (parcel.destination = req.body.destination), (parcel.weight = req.body.weight), (parcel.price = req.body.price),(parcel.userid = req.body.userid);
      return res.status(200).json({
        message: "Parcel Details Updated Successfully!!",
        Updated_Parcel: parcel
      });
    } else {
      res.status(400).json({
        error: "The Parcel You would like to update does not Exist! :-("
      });
    }
  }

  static getUserParcels(req, res) {
    const { userid } = req.params;
    const parcel = Parcels.find(UserParcel => UserParcel.userid == userid);
    if (parcel) {
      return res.status(200).json({
        message: "Order Placed By That Specific Users",
        userid:userid,
        Parcel: parcel
      });
    } else {
      res.status(400).json({
        error: "No Parcel Order with the Specified Id"
      });
    }
  }

  static deleteParcel(req, res) {
    let { id } = req.params;
    const findParcel = Parcels.find(parcel => {
      return parcel.id == id;
    });
    if (findParcel) {
      const newParcels = Parcels.filter(parcel => {
        return parcel !== findParcel;
      });
      res.status(200).json({
        message: "Parcel Cancelled Successfully!",
        Parcels: newParcels
      });
    } else {
      res.status(400).json({
        error: "Parcel Order Details could not be found! :-)"
      });
    }
  }
}

export default postsController;