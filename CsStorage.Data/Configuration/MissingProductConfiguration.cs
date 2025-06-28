using CsStorage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CsStorage.Data.Configuration
{
    public class MissingProductConfiguration : IEntityTypeConfiguration<MissingProduct>
    {
        public void Configure(EntityTypeBuilder<MissingProduct> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
            builder.Property(x => x.NeededDay)
                .HasColumnType("timestamp without time zone");
            builder.Property(x => x.IsBought).IsRequired();

            builder.Property(x => x.CreatedAt).HasColumnType("timestamp without time zone").IsRequired();
            builder.Property(x => x.UpdatedAt).HasColumnType("timestamp without time zone");

            builder.HasOne(x => x.Customer);
        }
    }
}