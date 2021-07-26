using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GigTrack.Models
{
    public class Gig
    {
        public int Id { get; set; }
        public int Pay { get; set; }
        public DateTime Date { get; set; }
        public int Mileage { get; set; }
        public int ClientId { get; set; }
        public string VenueName { get; set; }
        public int LocationId { get; set; }
        public string Notes { get; set; }
        public int UserId { get; set; }
        public Location Location { get; set; }

    }
}
