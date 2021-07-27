using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface ILocationRepository
    {
        void Add(Location location);
        List<Location> GetAllLocationsByFirebaseId(string firebaseUserId);
        void Delete(int id);
    }
}