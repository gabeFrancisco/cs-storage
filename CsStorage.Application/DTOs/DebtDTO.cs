using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;

namespace CsStorage.Application.DTOs
{
    public class DebtDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Value field is required!")]
        [Column(TypeName = "decimal(10,2)")]
        [DisplayFormat(DataFormatString = "{0:C2}")]
        [DataType(DataType.Currency)]
        [DisplayName("Value")]
        public decimal Value { get; set; }

        [Required(ErrorMessage = "The Forecast field is required!")]
        [DisplayName("Forecast")]
        public DateTime Forecast { get; set; }

        [Required(ErrorMessage = "The PaidDate field is required!")]
        [DisplayName("PaidDate")]
        public DateTime PaidDate { get; set; }
        public virtual CustomerDTO Customer { get; set; }

        [DisplayName("Customer")]
        public int CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}