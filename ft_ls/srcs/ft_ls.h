/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_ls.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/02 16:27:03 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 15:13:06 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_LS_H
# define FT_LS_H
# include "../get_next_line/get_next_line.h"
# include <dirent.h>
# include <sys/stat.h>
# include <time.h>
# include <pwd.h>
# include <grp.h>
# include <errno.h>
# define S_IRUSR 0000400    /* R for owner */
# define S_IWUSR 0000200    /* W for owner */
# define S_IXUSR 0000100    /* X for owner */
# define S_IRGRP 0000040    /* R for group */
# define S_IWGRP 0000020    /* W for group */
# define S_IXGRP 0000010    /* X for group */
# define S_IROTH 0000004    /* R for other */
# define S_IWOTH 0000002    /* W for other */
# define S_IXOTH 0000001    /* X for other */
# define S_IFMT   0170000   /* type of file */
# define S_IFIFO  0010000  /* named pipe (fifo) */
# define S_IFCHR  0020000  /* character special */
# define S_IFDIR  0040000  /* directory */
# define S_IFBLK  0060000  /* block special */
# define S_IFREG  0100000  /* regular */
# define S_IFLNK  0120000  /* symbolic link */
# define S_IFSOCK 0140000  /* socket */
# define S_IFWHT  0160000  /* whiteout */

typedef struct s_ij
{
	int	i;
	int	j;
}				t_ij;

typedef struct s_dir
{
	char			*name;
	unsigned char	type;
	int				date;
	struct stat		infos;
	struct s_dir	*next;
}				t_dir;

typedef struct s_flags
{
	int	l;
	int	a;
	int	r;
	int	t;
}				t_flags;

typedef struct s_args
{
	t_flags	flags;
	int		argdircnt;
	char	**argdirsnms;
}				t_args;

typedef struct s_ls
{
	struct dirent	*entity;
	t_dir			*dirlist;
	t_dir			*dirlisthead;
	DIR				*dir;
	t_args			args;
	int				err_status;
	int				total;
	int				htotal;
	int				nline;
}				t_ls;

int		ft_ls(char	*dirname, t_ls	*ls);
int		ft_tricky_link(char *dirname, t_flags flags, unsigned char type);
char	*ft_GetLastWord(char	*dirname);
void	ft_sort(t_ls	*ls, char	*dirname);
void	r_ascii_sort(t_ls	*ls);
void	dirs_check(t_ls	*ls, char	**argv, int	argc);
void	ft_lstrmv(t_dir	**head);
void	ft_boardel(char	**board);
void	flags_check(char	*argv, t_ls	*ls);
void	date_sort(t_ls	*ls, char	*dirname);
void	r_date_sort(t_ls	*ls, char	*dirname);
void	ft_print(t_ls	*ls, char	*dirname);
void	ft_permissions(mode_t	mode);
void	sort_dirnms(t_ls	*ls, int	count);
void	ft_swap(char **a, char **b);
void	ft_date(time_t mtime);
void	ft_permissions(mode_t mode);
void	print_ell(t_ls *ls);
void	ft_check_link(t_ls *ls, char *dirname, int i);
void	ft_read_link(char *path);
void	ft_minor_major(dev_t st_r_dev);

#endif
