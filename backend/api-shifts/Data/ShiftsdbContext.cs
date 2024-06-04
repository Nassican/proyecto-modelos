using System;
using System.Collections.Generic;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Data;

public partial class ShiftsdbContext : DbContext
{
    public ShiftsdbContext()
    {
    }

    public ShiftsdbContext(DbContextOptions<ShiftsdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ClientModel> Clients { get; set; }

    public virtual DbSet<ShiftModel> Shifts { get; set; }

    public virtual DbSet<TypesShiftModel> TypesShifts { get; set; }

    public virtual DbSet<UserModel> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClientModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__clients__3213E83FF884917A");

            entity.ToTable("clients");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.StudentCode)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("student_code");
        });

        modelBuilder.Entity<ShiftModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__shifts__3213E83F9330974C");

            entity.ToTable("shifts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AtCreated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("at_created");
            entity.Property(e => e.DateAttended)
                .HasColumnType("datetime")
                .HasColumnName("date_attended");
            entity.Property(e => e.IdClient).HasColumnName("id_client");
            entity.Property(e => e.IdTypeShift).HasColumnName("id_type_shift");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.IsAttended).HasColumnName("is_attended");
            entity.Property(e => e.NumShift)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("num_shift");

            entity.HasOne(d => d.IdClientNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdClient)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__shifts__id_clien__412EB0B6");

            entity.HasOne(d => d.IdTypeShiftNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdTypeShift)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__shifts__id_type___403A8C7D");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__shifts__id_user__4222D4EF");
        });

        modelBuilder.Entity<TypesShiftModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__types_sh__3213E83F9EBFAFA1");

            entity.ToTable("types_shifts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("code");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<UserModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F13F8B58F");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdTypeShift).HasColumnName("id_type_shift");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.IdTypeShiftNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.IdTypeShift)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__users__id_type_s__3C69FB99");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
