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
    public class GigController : ControllerBase
    {
        private readonly IGigRepository _gigRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public GigController(IGigRepository gigRepository, IUserProfileRepository userProfileRepository)
        {
            _gigRepository = gigRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<GigController>
        [HttpGet]
        public IActionResult GetGigsByUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var gigs = (_gigRepository.GetAllGigsByFirebaseId(currentUserProfileId));
            if (gigs == null)
            {
                return NotFound();
            }

            return Ok(gigs);
        }

        //GET api/<GigController>/5
        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var gig = _gigRepository.GetGigById(id, currentUserProfileId);
            if (gig == null)
            {
                return NotFound();
            }
            return Ok(gig);
        }
        
        //---Filter Functions---
        //Filter Gigs by Location
        [HttpGet("filterByLocation/{id}")]
        public IActionResult GetAllByLocationId(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var gig = _gigRepository.FilterAllGigsByLocationId(id, currentUserProfileId);
            if (gig == null)
            {
                return NotFound();
            }
            return Ok(gig);
        }

        //Filter Gigs By Client
        [HttpGet("filterByClient/{id}")]
        public IActionResult GetAllByClientId(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var gig = _gigRepository.FilterAllGigsByClientId(id, currentUserProfileId);
            if (gig == null)
            {
                return NotFound();
            }
            return Ok(gig);
        }


        //Filter Gigs By Venue Name
        //Syntax /filterByVenueName?venue=
        [HttpGet("filterByVenueName")]
        public IActionResult GetGigsByVenue(string venue)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var gig = _gigRepository.FilterAllGigsByVenue(venue, currentUserProfileId);
            if (gig == null)
            {
                return NotFound();
            }
            return Ok(gig);
        }
        //--------

        //// POST api/<GigController>
        [HttpPost]
        public IActionResult Post(Gig gig)
        {
            var currentUserProfile = GetCurrentUserProfile();
            gig.UserId = currentUserProfile.Id;

            _gigRepository.Add(gig);
            return CreatedAtAction(nameof(GetGigsByUser), new { id = gig.Id }, gig);
        }

        //// PUT api/<GigController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Gig gig)
        {

            if (id != gig.Id)
            {
                return BadRequest();
            }
            _gigRepository.UpdateGig(gig);
            return NoContent();
        }

        // DELETE api/<GigController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gigRepository.Delete(id);
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
