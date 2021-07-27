using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface IExpenseRepository
    {
        List<Expense> GetAllExpensesByFirebaseId(string firebaseUserId);
        Expense GetExpenseById(int id, string firebaseUserId);
        void Add(Expense expense);
        void Delete(int id);
    }
}