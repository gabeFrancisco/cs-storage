using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CsStorage.Data.Configuration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name).HasMaxLength(50).IsRequired();
            builder.Property(p => p.Phone).HasMaxLength(20).IsRequired();
            builder.Property(p => p.Cpf_cnpj).HasMaxLength(20).HasColumnName("cpf_cnpj");

            builder.HasOne(p => p.Address);

        }
    }
}