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
                        if (DbUtils.IsNotDbNull(reader, "pay"))
                        {
                            existingClient.GigPay.Add(DbUtils.GetInt(reader, "pay"));
                        }
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
                              c.id AS ClientId, c.companyName, c.phoneNumber, c.email as ClientEmail, c.userId,
                              u.id, u.[name], u.[email], u.firebaseUserId
                         FROM Client c
                              LEFT JOIN UserProfile u ON u.id = c.userId
                        WHERE firebaseUserId = @firebaseUserId AND c.id = @id";
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

        public void Add(Client client)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Client (
                            CompanyName, PhoneNumber, Email, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @CompanyName, @PhoneNumber, @Email, @UserId)";
                    DbUtils.AddParameter(cmd, "@CompanyName", client.CompanyName);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", client.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Email", client.Email);
                    DbUtils.AddParameter(cmd, "@UserId", client.UserId);

                    client.Id = (int)cmd.ExecuteScalar();
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
                            DELETE FROM Client
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateClient(Client client)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Client 
                            SET
                                
                                
                                CompanyName = @CompanyName,
                                PhoneNumber = @PhoneNumber,
                                Email = @Email,
                                UserId = @UserId
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", client.Id);
                    DbUtils.AddParameter(cmd, "@CompanyName", client.CompanyName);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", client.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Email", client.Email);
                    DbUtils.AddParameter(cmd, "@UserId", client.UserId);
                   

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private ClientViewModel NewClientVMFromReader(SqlDataReader reader)
        {
            return new ClientViewModel()
            {
                Id = DbUtils.GetInt(reader, "ClientId"),
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
                Id = DbUtils.GetInt(reader, "ClientId"),
                CompanyName = DbUtils.GetString(reader, "companyName"),
                PhoneNumber = DbUtils.GetInt(reader, "phoneNumber"),
                Email = DbUtils.GetString(reader, "ClientEmail"),
                UserId = DbUtils.GetInt(reader, "userId"),

            };
        }
    }
}
