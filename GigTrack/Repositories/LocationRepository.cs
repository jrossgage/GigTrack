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
    public class LocationRepository : BaseRepository, ILocationRepository
    {
        public LocationRepository(IConfiguration config) : base(config) { }

        public List<Location> GetAllLocationsByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT l.id as LocationId, l.city, l.state, l.userId,
                    u.id as UserId, u.[name], u.email, u.firebaseUserId
                    From Location l
                    LEFT JOIN UserProfile u ON l.userId = u.id
                    Where firebaseUserId = @firebaseUserId 
                    ORDER BY l.[state] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var locations = new List<Location>();

                    while (reader.Read())
                    {
                        locations.Add(NewLocationFromReader(reader));
                    }

                    reader.Close();

                    return locations;
                }
            }
        }

        //public Expense GetExpenseById(int id, string firebaseUserId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //            SELECT e.id AS ExpenseId, e.[name] as ExpenseName, e.cost, 
        //            e.date, e.userId,
        //            u.id as UserId, u.[name], u.email, u.firebaseUserId
        //            From Expense e
        //            LEFT JOIN UserProfile u ON e.userId = u.id
        //            Where firebaseUserId = @firebaseUserId AND e.id = @id";
        //            DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            var reader = cmd.ExecuteReader();

        //            Expense expense = null;

        //            if (reader.Read())
        //            {
        //                expense = NewLocationFromReader(reader);
        //            }

        //            reader.Close();

        //            return expense;
        //        }
        //    }
        //}

        public void Add(Location location)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Location (
                            City, [state], UserId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @City, @state, @UserId)";
                    DbUtils.AddParameter(cmd, "@City", location.City);
                    DbUtils.AddParameter(cmd, "@state", location.State);
                    DbUtils.AddParameter(cmd, "@UserId", location.UserId);

                    location.Id = (int)cmd.ExecuteScalar();
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
                            DELETE FROM Location
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Location NewLocationFromReader(SqlDataReader reader)
        {
            return new Location()
            {
                Id = DbUtils.GetInt(reader, "LocationId"),
                City = DbUtils.GetString(reader, "city"),
                State = DbUtils.GetString(reader, "state"),
                UserId = DbUtils.GetInt(reader, "userId")
            };
        }
    }
}
