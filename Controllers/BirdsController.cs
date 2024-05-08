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
    // All of these routes will be at the base URL:     /api/Birds
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case BirdsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class BirdsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BirdsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Birds
        //
        // Returns a list of all your Birds according to their userId
        //
        [HttpGet("list/{userId}")]
        public async Task<ActionResult<IEnumerable<Bird>>> GetBirds(int userId)
        {
            // Uses the database context in `_context` to request all of the Birds, sort
            // them by row id and return them as a JSON array.
            return await _context.Birds.Where(user => user.UserId == userId).ToListAsync();
        }

        // GET: api/Birds/5
        //
        // Fetches and returns a specific bird by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{birdId}")]
        public async Task<ActionResult<Bird>> GetBird(int birdId)
        {
            // Find the bird in the database using `FindAsync` to look it up by id
            var bird = await _context.Birds.FindAsync(birdId);

            // If we didn't find anything, we receive a `null` in return
            if (bird == null)
            {
                // Return a `404` response to the client indicating we could not find a bird with this id
                return NotFound();
            }

            //  Return the bird as a JSON object.
            return bird;
        }

        // PUT: api/Birds/5
        //
        // Update an individual bird with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Bird
        // variable named bird. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Bird POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{birdId}")]
        public async Task<IActionResult> PutBird(int birdId, Bird bird)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (birdId != bird.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in bird to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from bird
            _context.Entry(bird).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!BirdExists(birdId))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(bird);
        }

        // POST: api/Birds
        //
        // Creates a new bird in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Bird
        // variable named bird. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Bird POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Bird>> PostBird(Bird bird)
        {
            // Indicate to the database context we want to add this new record
            _context.Birds.Add(bird);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetBird", new { id = bird.Id }, bird);
        }

        // DELETE: api/Birds/5
        //
        // Deletes an individual bird with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{birdId}")]
        public async Task<IActionResult> DeleteBird(int birdId)
        {
            // Find this bird by looking for the specific id
            var bird = await _context.Birds.FindAsync(birdId);
            if (bird == null)
            {
                // There wasn't a bird with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Birds.Remove(bird);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(bird);
        }

        // Private helper method that looks up an existing bird by the supplied id
        private bool BirdExists(int birdId)
        {
            return _context.Birds.Any(bird => bird.Id == birdId);
        }
    }
}
