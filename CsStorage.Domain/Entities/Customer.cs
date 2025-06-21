using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Validation;

namespace CsStorage.Domain.Entities
{
    public class Customer : Entity
    {
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Cpf_cnpj { get; private set; }
        public Address Address { get; set; }
        public int AddressId { get; set; }

        public Customer(string name, string phone, string cpf_cnpj)
        {
            ValidateDomain(name, phone, cpf_cnpj);
        }

        public Customer(int id, string name, string phone, string cpf_cnpj)
        {
            DomainExceptionValidation.When(id < 0, "Invalid id");
            Id = id;
            ValidateDomain(name, phone, cpf_cnpj);
        }

        private void ValidateDomain(string name, string phone, string cpf_cnpj)
        {
            DomainExceptionValidation.When(string.IsNullOrEmpty(name), "Name is required");
            DomainExceptionValidation.When(string.IsNullOrEmpty(phone), "Phone is required");

            Name = name;
            Phone = phone;
            Cpf_cnpj = cpf_cnpj;
        }
    }
}