using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GigTrack.Models
{
    //this viewModel combines the properties of a Client along with a sum of the pay of all of the gigs the user has recieved.
    //This is achieved through sorting the "pay" property from all of the gigs associated with a client and then doing some logic within the PaySum property
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
