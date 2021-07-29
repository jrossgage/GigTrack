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
        [HttpGet("details/{id}")]
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
        public IActionResult Post(Expense expense)
        {
            var currentUserProfile = GetCurrentUserProfile();
            expense.UserId = currentUserProfile.Id;

            _expenseRepository.Add(expense);
            return CreatedAtAction(nameof(GetExpensesByUser), new { id = expense.Id }, expense);
        }

        // PUT api/<ExpenseController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Expense expense)
        {

            if (id != expense.Id)
            {
                return BadRequest();
            }
            _expenseRepository.UpdateExpense(expense);
            return NoContent();
        }

        // DELETE api/<ExpenseController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _expenseRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var expenses = _expenseRepository.Search(q, currentUserProfileId);
            if (expenses == null)
            {
                return NotFound();
            }

            return Ok(expenses);
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
