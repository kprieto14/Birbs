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
           var result =  await _context.BirdsOfTheDay.FirstOrDefaultAsync(b => b.ChosenDate == DateTime.Today.ToUniversalTime());

           if(result == null) {
            var countOfBirds = _context.Birds.Count();
            // Generate new bird of the day
            result = new BirdOfTheDay() {
                BirdId = new Random().Next(1, countOfBirds),
                ChosenDate = DateTime.Today.ToUniversalTime()
            }; 

            // Assign new bird to result
            _context.BirdsOfTheDay.Add(result);
            await _context.SaveChangesAsync();
           }

           result.Bird = await _context.Birds.FirstOrDefaultAsync(b => b.Id == result.BirdId);
           return result;
        }

        // Private helper method that looks up an existing birdOfTheDay by the supplied id
        private bool BirdOfTheDayExists(int id)
        {
            return _context.BirdsOfTheDay.Any(birdOfTheDay => birdOfTheDay.Id == id);
        }
    }
}
