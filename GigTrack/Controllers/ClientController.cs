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
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ClientController(IClientRepository clientRepository, IUserProfileRepository userProfileRepository)
        {
            _clientRepository = clientRepository;
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult GetClientsByUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var clients = (_clientRepository.GetAllClientsByFirebaseId(currentUserProfileId));
            if (clients == null)
            {
                return NotFound();
            }

            return Ok(clients);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var client = _clientRepository.GetClientById(id, currentUserProfileId);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
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
