using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Birbs.Models;

namespace Birbs.Controllers
{
    // All of these routes will be at the base URL:     /api/BirdsOfTheDay
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case BirdsOfTheDayController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class BirdsOfTheDayController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BirdsOfTheDayController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BirdsOfTheDay
        //
        // Returns a Bird from the database, should eventually also assign a random bird
        //
        [HttpGet]
        public async Task<ActionResult<BirdOfTheDay>> GetBirdsOfTheDay()
        {
            // Uses the database context in `_context` to request all of the BirdsOfTheDay, then
            // return the first bird in the array oof

            // Finds the list of birds by order of date
            ////var birds = await _context.BirdsOfTheDay.OrderBy(row => row.id).ToListAsync();

            // Checks list length
            // If length = 0, add a random bird from the database by creating a new instance of BirdOfTheDay
            // If length > 0
                // Check to see that bird list greater than 7 and delete the the first in the array
                // Finds the most recent bird, and checks the date
                    // If its the same day, make sure the bird still exists & return the bird, else find a new bird
                    // If the date is different, grab a random bird from the database, assign it to today, and return that bird              

            return await _context.BirdsOfTheDay.FirstOrDefaultAsync();
        }

        // Private helper method that looks up an existing birdOfTheDay by the supplied id
        private bool BirdOfTheDayExists(int id)
        {
            return _context.BirdsOfTheDay.Any(birdOfTheDay => birdOfTheDay.Id == id);
        }
    }
}
