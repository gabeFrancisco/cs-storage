using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Enums;

namespace CsStorage.Application.DTOs
{
    public class CashRegisterDTO
    {
        public int Id { get; set; }

        public PaymentType PaymentType { get; set; }


        [Required(ErrorMessage = "The Value field is required!")]
        [Column(TypeName = "decimal(10,2)")]
        [DisplayFormat(DataFormatString = "{0:C2}")]
        [DataType(DataType.Currency)]
        [DisplayName("Value")]
        public decimal Value { get; set; }

        [Required(ErrorMessage = "The Description field is required!")]
        [MaxLength(50)]
        [DisplayName("Description")]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}