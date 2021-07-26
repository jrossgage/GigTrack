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
    public class ClientRepository : BaseRepository, IClientRepository
    {
        public ClientRepository(IConfiguration config) : base(config) { }

        public List<ClientViewModel> GetAllClientsByFirebaseId(string firebaseUserId)
        {
            //TODO: I need a list of ints of the gig pay associated with each client to be able to do some logic to
            //determine if a client has paid the user $600 or more.
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT 
                              c.id AS ClientId, c.companyName, c.phoneNumber, c.email, c.userId,
                              g.id, g.pay, 
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Client c
                              LEFT JOIN Gig g ON g.clientId = c.id
                              LEFT JOIN UserProfile u ON u.id = c.userId
                        WHERE firebaseUserId = @firebaseUserId
                         ORDER BY c.companyName DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var clients = new List<ClientViewModel>();

                    while (reader.Read())
                    {
                        var clientId = DbUtils.GetInt(reader, "ClientId");
                        var existingClient = clients.FirstOrDefault(c => c.Id == clientId);
                        if (existingClient == null)
                        {
                            existingClient = NewClientVMFromReader(reader);
                            clients.Add(existingClient);
                        };
                        existingClient.GigPay.Add(DbUtils.GetInt(reader, "pay"));

                    }

                    reader.Close();

                    return clients;
                }
            }
        }

        public Client GetClientById(int id, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT 
                              c.id AS ClientId, c.companyName, c.phoneNumber, c.email, c.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Client c
                              LEFT JOIN Gig g ON g.clientId = c.id
                              LEFT JOIN UserProfile u ON u.id = c.userId
                        WHERE firebaseUserId = @firebaseUserId AND ClientId = @id";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Client client = null;

                    if (reader.Read())
                    {
                        client = NewClientFromReader(reader);
                    }

                    reader.Close();

                    return client;
                }
            }
        }

        private ClientViewModel NewClientVMFromReader(SqlDataReader reader)
        {
            return new ClientViewModel()
            {
                Id = DbUtils.GetInt(reader, "id"),
                CompanyName = DbUtils.GetString(reader, "companyName"),
                PhoneNumber = DbUtils.GetInt(reader, "phoneNumber"),
                Email = DbUtils.GetString(reader, "email"),
                UserId = DbUtils.GetInt(reader, "userId"),
                GigPay = new List<int>()
            };
        }
        private Client NewClientFromReader(SqlDataReader reader)
        {
            return new Client()
            {
                Id = DbUtils.GetInt(reader, "id"),
                CompanyName = DbUtils.GetString(reader, "companyName"),
                PhoneNumber = DbUtils.GetInt(reader, "phoneNumber"),
                Email = DbUtils.GetString(reader, "email"),
                UserId = DbUtils.GetInt(reader, "userId"),

            };
        }
    }
}
