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
    public class GigRepository : BaseRepository, IGigRepository
    {
        public GigRepository(IConfiguration config) : base(config) { }

        public List<Gig> GetAllGigsByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT g.id, g.pay, g.[Date], 
                              g.mileage,
                              g.clientId, g.venueName, g.locationId,
                              g.userId, g.notes, 
                              l.id, l.city, l.[state], l.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN UserProfile u on g.userId = u.id
                        WHERE firebaseUserId = @firebaseUserId
                         ORDER BY g.[date] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var gigs = new List<Gig>();

                    while (reader.Read())
                    {
                        gigs.Add(NewGigFromReader(reader));
                    }

                    reader.Close();

                    return gigs;
                }
            }
        }

        public Gig GetGigById(int id, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT g.id, g.pay, g.[Date], 
                              g.mileage,
                              g.clientId, g.venueName, g.locationId,
                              g.userId, g.notes, 
                              l.id, l.city, l.[state], l.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN UserProfile u on g.userId = u.id
                        WHERE firebaseUserId = @firebaseUserId AND g.id = @id";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Gig gig = null;

                    if (reader.Read())
                    {
                        gig = NewGigFromReader(reader);
                    }

                    reader.Close();

                    return gig;
                }
            }
        }

        private Gig NewGigFromReader(SqlDataReader reader)
        {
            return new Gig()
            {
                Id = DbUtils.GetInt(reader, "id"),
                Pay = DbUtils.GetInt(reader, "pay"),
                Date = DbUtils.GetDateTime(reader, "date"),
                Mileage = DbUtils.GetInt(reader, "mileage"),
                ClientId = DbUtils.GetInt(reader, "clientId"),
                VenueName = DbUtils.GetString(reader, "venueName"),
                LocationId = DbUtils.GetInt(reader, "locationId"),
                Location = new Location()
                {
                    Id = DbUtils.GetInt(reader, "locationId"),
                    City = DbUtils.GetString(reader, "city"),
                    State = DbUtils.GetString(reader, "state"),
                    UserId = DbUtils.GetInt(reader, "userId")
                },
                UserId = DbUtils.GetInt(reader, "userId"),
                Notes = DbUtils.GetString(reader, "notes")
            };
        }
    }
}
