using GigTrack.Models;
using System.Collections.Generic;

namespace GigTrack.Repositories
{
    public interface IGigRepository
    {
        List<Gig> GetAllGigsByFirebaseId(string firebaseUserId);

        Gig GetGigById(int id, string firebaseUserId);

        void Add(Gig gig);

        void Delete(int id);

        void UpdateGig(Gig gig);

        List<Gig> FilterAllGigsByLocationId(int locationId, string firebaseUserId);

        List<Gig> FilterAllGigsByClientId(int clientId, string firebaseUserId);

        List<Gig> FilterAllGigsByVenue(string venue, string firebaseUserId);
    }
}