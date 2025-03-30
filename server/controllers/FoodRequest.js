import FoodRequest from '../models/FoodRequest.js';

export const createFoodRequest = async (req, res) => {
  try {
    const { foodType, quantity, dietaryRestrictions, urgency, location, requesterId } = req.body;
    
    if (!foodType || !quantity || !requesterId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const foodRequest = await FoodRequest.create({
      foodType,
      quantity,
      dietaryRestrictions,
      urgency,
      location,
      requesterId
    });

    res.status(201).json(foodRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFoodRequests = async (req, res) => {
  try {
    const { requesterId } = req.query;
    
    if (!requesterId) {
      return res.status(400).json({ error: 'Requester ID is required' });
    }

    const foodRequests = await FoodRequest.find({ requesterId }).sort('-createdAt');
    res.status(200).json(foodRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFoodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const foodRequest = await FoodRequest.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!foodRequest) {
      return res.status(404).json({ error: 'Food request not found' });
    }

    res.status(200).json(foodRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFoodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const foodRequest = await FoodRequest.findByIdAndDelete(id);

    if (!foodRequest) {
      return res.status(404).json({ error: 'Food request not found' });
    }

    res.status(200).json({ message: 'Food request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};