using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Application.DTOs
{
    public class CustomerDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Name field is required!")]
        [MaxLength(50)]
        [DisplayName("Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Phone field is required!")]
        [MaxLength(20)]
        [DisplayName("Phone")]
        public string Phone { get; set; }

        [MaxLength(20)]
        [DisplayName("Cpf_cnpj")]
        public string Cpf_cnpj { get; set; }
        public AddressDTO AddressDto { get; set; }

        [DisplayName("Address")]
        public int AddressId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}