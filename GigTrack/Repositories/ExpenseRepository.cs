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

        public void Add(Expense expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Expense (
                            [Name], Cost, Date, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Cost, @Date, @UserId)";
                    DbUtils.AddParameter(cmd, "@Name", expense.Name);
                    DbUtils.AddParameter(cmd, "@Cost", expense.Cost);
                    DbUtils.AddParameter(cmd, "@Date", expense.Date);
                    DbUtils.AddParameter(cmd, "@UserId", expense.UserId);

                    expense.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Expense
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateExpense(Expense expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Expense 
                            SET
                                
                               
                                Name = @Name,
                                Cost = @Cost,
                                Date = @Date,
                                UserId = @UserId
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Name", expense.Name);
                    DbUtils.AddParameter(cmd, "@Cost", expense.Cost);
                    DbUtils.AddParameter(cmd, "@Date", expense.Date);
                    DbUtils.AddParameter(cmd, "@UserId", expense.UserId);
                    DbUtils.AddParameter(cmd, "@Id", expense.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Expense> Search(string criterion, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.id AS ExpenseId, e.[name] AS ExpenseName, e.cost, 
                    e.date, e.userId,
                    u.id as UserId, u.[name], u.email, u.firebaseUserId
                    From Expense e
                    LEFT JOIN UserProfile u ON e.userId = u.id
                    WHERE firebaseUserId = @firebaseUserId AND e.[name] LIKE @Criterion
                    ORDER BY e.[date] DESC";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
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
