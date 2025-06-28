using CsStorage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CsStorage.Data.Configuration;

public class CashRegisterConfiguration : IEntityTypeConfiguration<CashRegister>
{
    public void Configure(EntityTypeBuilder<CashRegister> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.PaymentType).IsRequired();
        builder.Property(x => x.Value).HasPrecision(10, 2).IsRequired();
        builder.Property(x => x.Description).HasMaxLength(50).IsRequired();
    }
}