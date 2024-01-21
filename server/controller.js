let vehicles = {
    '9ABC123': 'April 23 2024',
    '3XYZ876': 'January 30 2024',
    '4xxy123': 'February 20 2025',
    '5abc345': 'July 15, 2025'

    // more vehicles...
  }
export {vehicles};

module.exports = {
    addvehicle: (req, res) => {
      const tagNumber = req.body.TagNumber;
      const dueDate = req.body.DueDate;
      vehicles.tagNumber = dueDate
      res.send(`${tagNumber}, ${dueDate}`)
      }
    
  }
