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
                              c.id AS ClientObjectId, c.companyName, c.phoneNumber, c.email,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN Client c ON g.clientId = c.id
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
                              c.id AS ClientObjectId, c.companyName, c.phoneNumber, c.email,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN Client c ON g.clientId = c.id
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

        public void Add(Gig gig)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Gig (
                            Pay, Date, Mileage, ClientId, VenueName,
                            LocationId, Notes, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Pay, @Date, @Mileage, @ClientId, @VenueName,
                            @LocationId, @Notes, @UserId)";
                    DbUtils.AddParameter(cmd, "@Pay", gig.Pay);
                    DbUtils.AddParameter(cmd, "@Date", gig.Date);
                    DbUtils.AddParameter(cmd, "@Mileage", gig.Mileage);
                    DbUtils.AddParameter(cmd, "@ClientId", gig.ClientId);
                    DbUtils.AddParameter(cmd, "@VenueName", gig.VenueName);
                    DbUtils.AddParameter(cmd, "@LocationId", gig.LocationId);
                    DbUtils.AddParameter(cmd, "@Notes", gig.Notes);
                    DbUtils.AddParameter(cmd, "@UserId", gig.UserId);


                    gig.Id = (int)cmd.ExecuteScalar();
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
                            DELETE FROM Gig
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateGig(Gig gig)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Gig 
                            SET
                                
                                Pay = @Pay,
                                Date = @Date,
                                Mileage = @Mileage,
                                ClientId = @ClientId,
                                VenueName = @VenueName,
                                LocationId = @LocationId,
                                Notes = @Notes
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Pay", gig.Pay);
                    DbUtils.AddParameter(cmd, "@Date", gig.Date);
                    DbUtils.AddParameter(cmd, "@Mileage", gig.Mileage);
                    DbUtils.AddParameter(cmd, "@ClientId", gig.ClientId);
                    DbUtils.AddParameter(cmd, "@VenueName", gig.VenueName);
                    DbUtils.AddParameter(cmd, "@LocationId", gig.LocationId);
                    DbUtils.AddParameter(cmd, "@Notes", gig.Notes);
                    DbUtils.AddParameter(cmd, "@Id", gig.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Gig> FilterAllGigsByLocationId(int locationId, string firebaseUserId)
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
                              c.id AS ClientObjectId, c.companyName, c.phoneNumber, c.email,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN Client c ON g.clientId = c.id
                              LEFT JOIN UserProfile u on g.userId = u.id
                        WHERE firebaseUserId = @firebaseUserId AND l.id = @locationId
                         ORDER BY g.[date] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@locationId", locationId);

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

        public List<Gig> FilterAllGigsByClientId(int clientId, string firebaseUserId)
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
                              c.id AS ClientObjectId, c.companyName, c.phoneNumber, c.email, c.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN Client c ON g.clientId = c.id
                              LEFT JOIN UserProfile u on g.userId = u.id
                        WHERE firebaseUserId = @firebaseUserId AND c.id = @clientId
                         ORDER BY g.[date] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@clientId", clientId);

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

        public List<Gig> FilterAllGigsByVenue(string venue, string firebaseUserId)
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
                              c.id AS ClientObjectId, c.companyName, c.phoneNumber, c.email, c.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Gig g
                              LEFT JOIN Location l ON g.locationId = l.id
                              LEFT JOIN Client c ON g.clientId = c.id
                              LEFT JOIN UserProfile u on g.userId = u.id
                        WHERE firebaseUserId = @firebaseUserId AND g.VenueName = @venue
                         ORDER BY g.[date] DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@venue", venue);

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

        private Gig NewGigFromReader(SqlDataReader reader)
        {
            return new Gig()
            {
                Id = DbUtils.GetInt(reader, "id"),
                Pay = DbUtils.GetInt(reader, "pay"),
                Date = DbUtils.GetDateTime(reader, "date"),
                Mileage = DbUtils.GetInt(reader, "mileage"),
                ClientId = DbUtils.GetInt(reader, "clientId"),
                Client = new Client()
                {
                    Id = DbUtils.GetInt(reader, "ClientObjectId"),
                    CompanyName = DbUtils.GetString(reader, "companyName"),
                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                    Email = DbUtils.GetString(reader, "email"),
                    UserId = DbUtils.GetInt(reader, "userId")
                },
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
