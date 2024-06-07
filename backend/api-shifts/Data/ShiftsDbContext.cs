using System;
using System.Collections.Generic;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Data;

public partial class ShiftsDbContext : DbContext
{
    public ShiftsDbContext()
    {
    }

    public ShiftsDbContext(DbContextOptions<ShiftsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ClientModel> Clients { get; set; }

    public virtual DbSet<ShiftModel> Shifts { get; set; }

    public virtual DbSet<TypesShiftModel> TypesShifts { get; set; }

    public virtual DbSet<UserModel> Users { get; set; }

    public virtual DbSet<UsersTypesShiftModel> UsersTypesShifts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClientModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("clients_pkey");

            entity.ToTable("clients");

            entity.HasIndex(e => e.Email, "clients_email_key").IsUnique();

            entity.HasIndex(e => e.StudentCode, "clients_student_code_key").IsUnique();

            entity.HasIndex(e => e.Email, "idx_clients_email");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .HasColumnName("name");
            entity.Property(e => e.StudentCode)
                .HasMaxLength(9)
                .HasColumnName("student_code");
        });

        modelBuilder.Entity<ShiftModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("shifts_pkey");

            entity.ToTable("shifts");

            entity.HasIndex(e => e.DateAttended, "idx_shifts_date_attended");

            entity.HasIndex(e => e.IdClient, "idx_shifts_id_client");

            entity.HasIndex(e => new { e.NumShift, e.IdTypeShift }, "num_shift_unique").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AtCreated)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("at_created");
            entity.Property(e => e.DateAttended)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("date_attended");
            entity.Property(e => e.IdClient).HasColumnName("id_client");
            entity.Property(e => e.IdTypeShift).HasColumnName("id_type_shift");
            entity.Property(e => e.IdUser).HasColumnName("id_user");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.IsAttended).HasColumnName("is_attended");
            entity.Property(e => e.IsStandby)
                .HasDefaultValue(true)
                .HasColumnName("is_standby");
            entity.Property(e => e.NumShift)
                .HasMaxLength(10)
                .HasColumnName("num_shift");

            entity.HasOne(d => d.IdClientModelNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdClient)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("shifts_id_client_fkey");

            entity.HasOne(d => d.IdTypeShiftModelNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdTypeShift)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("shifts_id_type_shift_fkey");

            entity.HasOne(d => d.IdUserModelNavigation).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("shifts_id_user_fkey");
        });

        modelBuilder.Entity<TypesShiftModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("types_shifts_pkey");

            entity.ToTable("types_shifts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(2)
                .HasColumnName("code");
            entity.Property(e => e.Color)
                .HasMaxLength(6)
                .HasColumnName("color");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Icon)
                .HasMaxLength(100)
                .HasColumnName("icon");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<UserModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "idx_users_email");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.HasIndex(e => e.Username, "users_username_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(256)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UsersTypesShiftModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_types_shifts_pkey");

            entity.ToTable("users_types_shifts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdTypeShift).HasColumnName("id_type_shift");
            entity.Property(e => e.IdUser).HasColumnName("id_user");

            entity.HasOne(d => d.IdTypeShiftModelNavigation).WithMany(p => p.UsersTypesShifts)
                .HasForeignKey(d => d.IdTypeShift)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_types_shifts_id_type_shift_fkey");

            entity.HasOne(d => d.IdUserModelNavigation).WithMany(p => p.UsersTypesShifts)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_types_shifts_id_user_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
