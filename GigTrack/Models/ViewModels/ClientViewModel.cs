using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GigTrack.Models
{
    public class ClientViewModel
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
        public List<int> GigPay { get; set; }

        public int PaySum
        { get {
                int total = 0;
                foreach(int i in GigPay)
                {
                    total += i;
                }
                return total;
               }
        }
    }
}
