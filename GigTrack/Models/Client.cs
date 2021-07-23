using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GigTrack.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public int PhoneNumber { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }

    }
}
