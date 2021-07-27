using GigTrack.Models;
using GigTrack.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GigTrack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        private readonly ILocationRepository _locationRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public LocationController(ILocationRepository locationRepository, IUserProfileRepository userProfileRepository)
        {
            _locationRepository = locationRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<LocationController>
        [HttpGet]
        public IActionResult GetLocationsByUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var locations = (_locationRepository.GetAllLocationsByFirebaseId(currentUserProfileId));
            if (locations == null)
            {
                return NotFound();
            }
            return Ok(locations);
        }

        // GET api/<LocationController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<LocationController>
        [HttpPost]
        public IActionResult Post(Location location)
        {
            var currentUserProfile = GetCurrentUserProfile();
            location.UserId = currentUserProfile.Id;

            _locationRepository.Add(location);
            return CreatedAtAction(nameof(GetLocationsByUser), new { id = location.Id }, location);
        }

        // PUT api/<LocationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LocationController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _locationRepository.Delete(id);
            return NoContent();
        }


        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
