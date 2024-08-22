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

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BirdsOfTheDayController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BirdsOfTheDay
        //
        // Returns a Bird from the database, also assigns a new bird of the day if there is none
        //
        [HttpGet]
        public async Task<ActionResult<BirdOfTheDay>> GetBirdsOfTheDay()
        {
            // Search for bird that is equal to today's date
            var result =  await _context.BirdsOfTheDay.FirstOrDefaultAsync(bird => bird.ChosenDate == DateTime.Today.ToUniversalTime());

            // Checks if there is a bird of the day result   
            if(result == null) {
                // Grabs the list of the Birds of the Day
                var listOfBirds = _context.Birds.ToListAsync();
                
                // Chooses a random bird from all users
                Random rnd = new();
                var randomBird = rnd.Next((await listOfBirds).Count);
                var chosenBird = await _context.Birds.FirstOrDefaultAsync(bird => bird.Id == randomBird);
                
                // Finds the user attached to the bird
                var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == chosenBird.UserId);
                
                // Generate new bird of the day
                result = new BirdOfTheDay() {
                    BirdId = randomBird,
                    ChosenDate = DateTime.Today.ToUniversalTime(),
                    UserName = user.Username,
                }; 

                // Assign new bird to result
                _context.BirdsOfTheDay.Add(result);
                await _context.SaveChangesAsync();
           }

            // Return the bird's information that matches the id of the bird in the database
            result.Bird = await _context.Birds.FirstOrDefaultAsync(bird => bird.Id == result.BirdId);

            return result;
        }

        // Private helper method that looks up an existing birdOfTheDay by the supplied id
        private bool BirdOfTheDayExists(int id)
        {
            return _context.BirdsOfTheDay.Any(birdOfTheDay => birdOfTheDay.Id == id);
        }
    }
}
