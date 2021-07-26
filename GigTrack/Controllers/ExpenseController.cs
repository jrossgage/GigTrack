﻿using GigTrack.Models;
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
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ExpenseController(IExpenseRepository expenseRepository, IUserProfileRepository userProfileRepository)
        {
            _expenseRepository = expenseRepository;
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<ExpenseController>
        [HttpGet]
        public IActionResult GetExpensesByUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var expenses = (_expenseRepository.GetAllExpensesByFirebaseId(currentUserProfileId));
            if (expenses == null)
            {
                return NotFound();
            }
            return Ok(expenses);
        }

        // GET api/<ExpenseController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var expense = _expenseRepository.GetExpenseById(id, currentUserProfileId);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        // POST api/<ExpenseController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ExpenseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ExpenseController>/5
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
