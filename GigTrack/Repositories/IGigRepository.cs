using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface IGigRepository
    {
        List<Gig> GetAllGigsByFirebaseId(string firebaseUserId);

        Gig GetGigById(int id, string firebaseUserId);
    }
}