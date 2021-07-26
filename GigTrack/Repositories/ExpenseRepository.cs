using GigTrack.Models;
using GigTrack.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GigTrack.Repositories
{
    public class ExpenseRepository : BaseRepository, IExpenseRepository
    {
        public ExpenseRepository(IConfiguration config) : base(config) { }

        public List<Expense> GetAllExpensesByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.id AS ExpenseId, e.[name] as ExpenseName, e.cost, 
                    e.date, e.userId,
                    u.id as UserId, u.[name], u.email, u.firebaseUserId
                    From Expense e
                    LEFT JOIN UserProfile u ON e.userId = u.id
                    Where firebaseUserId = @firebaseUserId 
                    ORDER BY e.[date] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var expenses = new List<Expense>();

                    while (reader.Read())
                    {
                        expenses.Add(NewExpenseFromReader(reader));
                    }

                    reader.Close();

                    return expenses;
                }
            }
        }

        public Expense GetExpenseById(int id, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.id AS ExpenseId, e.[name] as ExpenseName, e.cost, 
                    e.date, e.userId,
                    u.id as UserId, u.[name], u.email, u.firebaseUserId
                    From Expense e
                    LEFT JOIN UserProfile u ON e.userId = u.id
                    Where firebaseUserId = @firebaseUserId AND e.id = @id";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Expense expense = null;

                    if (reader.Read())
                    {
                        expense = NewExpenseFromReader(reader);
                    }

                    reader.Close();

                    return expense;
                }
            }
        }

        private Expense NewExpenseFromReader(SqlDataReader reader)
        {
            return new Expense()
            {
                Id = DbUtils.GetInt(reader, "ExpenseId"),
                Name = DbUtils.GetString(reader, "ExpenseName"),
                Date = DbUtils.GetDateTime(reader, "date"),
                Cost = DbUtils.GetInt(reader, "cost"),
                UserId = DbUtils.GetInt(reader, "userId")
            };
        }
    }
}
