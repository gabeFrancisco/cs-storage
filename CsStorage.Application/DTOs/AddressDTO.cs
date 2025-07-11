using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Application.DTOs
{
    public class AddressDTO
    {
        public int Id { get; set; }

        [MaxLength(100)]
        [DisplayName("Road")]
        public string Road { get; set; }

        [MaxLength(10)]
        [DisplayName("Number")]
        public string Number { get; set; }

        [DisplayName("Complement")]
        public string Complement { get; set; }

        [DisplayName("Neighborhood")]
        public string Neighborhood { get; set; }

        [DisplayName("City")]
        public string City { get; set; }

        [DisplayName("State")]
        public string State { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}