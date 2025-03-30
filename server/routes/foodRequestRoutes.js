import { Router } from "express";
import FoodRequest from "../models/FoodRequest.js";
import User from "../models/user.js";

const router = Router();

// Route to handle food request submission
router.post("/foodrequests", async (req, res) => {
    try {
        const { 
            foodType, 
            quantity, 
            dietaryRestrictions, 
            urgency, 
            location, 
            email 
        } = req.body.formData;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save the request data to the database
        const foodRequest = await FoodRequest.create({
            foodType,
            quantity,
            dietaryRestrictions: dietaryRestrictions || "None",
            urgency,
            location,
            requesterId: user._id,
            status: "Pending"
        });

        // Update user's food requests array
        user.foodRequests = user.foodRequests || [];
        user.foodRequests.push(foodRequest._id);
        await user.save();

        res.status(201).json({
            message: "Food request submitted successfully",
            request: foodRequest
        });
    } catch (error) {
        console.error("Error submitting food request:", error);
        res.status(500).json({ 
            message: "Server Error",
            error: error.message 
        });
    }
});

// Route to get all food requests

// In your backend route
router.get("/food", async (req, res) => {
  try {
    const requests = await FoodRequest.find({})
      .sort({ createdAt: -1 })
      .populate('requesterId', 'name email');
    
    // Always return an array, even if empty
    res.status(200).json({
      success: true,
      data: requests || [] // Ensure array format
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      data: [] // Fallback empty array
    });
  }
});

// Route to get food requests for a specific user
// router.get("/foodrequest/user/:email", async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.params.email });
        
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const requests = await FoodRequest.find({ requesterId: user._id })
//             .sort({ createdAt: -1 });

//         res.status(200).json(requests);
//     } catch (error) {
//         console.error("Error fetching user's food requests:", error);
//         res.status(500).json({ 
//             message: "Server Error",
//             error: error.message 
//         });
//     }
// });

export default router;