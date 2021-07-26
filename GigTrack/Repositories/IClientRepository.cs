using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface IClientRepository
    {
        List<ClientViewModel> GetAllClientsByFirebaseId(string firebaseUserId);

        Client GetClientById(int id, string firebaseUserId);
    }
}