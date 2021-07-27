using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface IClientRepository
    {
        List<ClientViewModel> GetAllClientsByFirebaseId(string firebaseUserId);

        Client GetClientById(int id, string firebaseUserId);

        void Add(Client client);

        void Delete(int id);

        void UpdateClient(Client client);

        List<ClientViewModel> Search(string criterion, string firebaseUserId);
    }
}